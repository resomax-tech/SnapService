import db_connect from "./connectDB";
import JobModel from "@/models/JobModel";
import WorkerModel from "@/models/WorkerModel";

export const getUnassignedJobs = async (dateKey) => {
    await db_connect()

    const jobs = await JobModel.find({
        worker: null,
        dateKey
    });

    const grouped = jobs.reduce((acc, job) => {
        const key = `${job.community}_${job.workType}`
        if (!acc[key]) acc[key] = []

        acc[key].push(job);
        return acc;
    }, {})

    return grouped
}

export const getAvailableWorkers = async (communityId, workType, dateKey) => {
    await db_connect()

    const workers = await WorkerModel.find({
        workType,
        communities: { $in: [communityId] }
    })

    const available = []

    for (const worker of workers) {
        const alreadyAssigned = await JobModel.countDocuments({
            worker: worker._id,
            dateKey
        })

        // console.log("alreadyAssigned", alreadyAssigned);
        // console.log("worker", worker);
        // console.log("maxBathrooms", worker.maxBathrooms);

        const remaining = worker.maxBathrooms - alreadyAssigned;

        if (remaining > 0) {
            available.push({
                id: worker._id,
                name: worker.name,
                remaining
            })
        }
    }
    return available.sort((a, b) => b.remaining - a.remaining)
}


export const assignJobsToWorkers = async (jobs, workers) => {
    await db_connect()

    if (workers.length === 0) return []

    let i = 0
    let updates = []   

    for (const job of jobs) {
        if (workers.length === 0) break;

        let worker = workers[i]

        if (job.bathrooms > worker.remaining) {
            const next = workers.find(w => w.remaining >= job.bathrooms);
            if (!next) break; // no one can take this job
            worker = next;
            i = workers.indexOf(next);
        }


        updates.push({
            updateOne: {
                filter: { _id: job._id },
                update: { worker: worker.id, status: "assigned" }
            }
        })

        worker.remaining -= job.bathrooms

        if (worker.remaining <= 0) {
            workers.splice(i, 1)
            if (workers.length === 0) break;
            if (i >= workers.length) i = 0;
        }
        else {
            i = (i + 1) % workers.length;
        }
    }

    if (updates.length > 0) {
        const response = await JobModel.bulkWrite(updates)
        console.log(response);

    }

    return updates
}