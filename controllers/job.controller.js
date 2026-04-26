import { job as Job } from "../models/job.model.js";

//  POST JOB
export const postJob = async (req, res) => {
    try {
        const {
            title,
            discription,   
            requirements,
            salary,
            experience,
            location,
            jobType,
            position,
            companyId
        } = req.body;

        const userId = req.id; // middleware se aayega

        if (!title || !discription || !requirements || !salary || !experience || !location || !jobType || !position || !companyId) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }
        const parsedRequirements = Array.isArray(requirements)? requirements: requirements.split(',').map(r => r.trim());

        const newJob = await Job.create({
            title,
            discription,
            requirements: parsedRequirements,
            salary: Number(salary),
            experience: Number(experience),
            location,
            jobType,
            position: Number(position),
            company: companyId,
            created_By: userId
        });

        return res.status(201).json({
            job: newJob,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};



//  GET ALL JOBS 
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { discription: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query);

        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};



//  GET JOB BY ID
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        const jobData = await Job.findById(jobId);

        if (!jobData) {
            return res.status(404).json({
                message: "No job found",
                success: false
            });
        }

        return res.status(200).json({
            job: jobData,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};



//  GET ADMIN JOBS
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;

        const jobs = await Job.find({ created_By: adminId });

        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};