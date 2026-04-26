




// import { Application } from '../models/application.model.js';
// import Job from '../models/job.model.js';

// // ================= APPLY JOB =================
// export const applyJob = async (req, res) => {
//     try {
//         const userId = req.id;
//         const jobId = req.params.id;

//         if (!jobId) {
//             return res.status(400).json({
//                 message: "Job id is required",
//                 success: false
//             });
//         }

//         // check if already applied
//         const existingApplication = await Application.findOne({
//             applicant: userId,
//             job: jobId
//         });

//         if (existingApplication) {
//             return res.status(400).json({
//                 message: "You have already applied for this job",
//                 success: false
//             });
//         }

//         // check job exists
//         const job = await Job.findById(jobId);
//         if (!job) {
//             return res.status(404).json({
//                 message: "Job not found",
//                 success: false
//             });
//         }

//         // create application
//         const newApplication = await Application.create({
//             job: jobId,
//             applicant: userId,
//         });

//         // push application into job
//         job.Applications.push(newApplication._id);
//         await job.save();

//         return res.status(201).json({
//             message: "Application submitted successfully",
//             success: true,
//             application: newApplication
//         });

//     } catch (error) {
//         return res.status(500).json({
//             message: error.message,
//             success: false
//         });
//     }
// };


// // ================= GET USER APPLIED JOBS =================
// export const getAppliedJobs = async (req, res) => {
//     try {
//         const userId = req.id;

//         const applications = await Application.find({ applicant: userId })
//             .sort({ createdAt: -1 })
//             .populate({
//                 path: 'job',
//                 populate: {
//                     path: 'company'
//                 }
//             });

//         if (!applications || applications.length === 0) {
//             return res.status(404).json({
//                 message: "No applications found",
//                 success: false
//             });
//         }

//         return res.status(200).json({
//             message: "Applications found",
//             success: true,
//             applications
//         });

//     } catch (error) {
//         return res.status(500).json({
//             message: error.message,
//             success: false
//         });
//     }
// };


// // ================= GET APPLICATIONS (ADMIN) =================
// export const getApplicants = async (req, res) => {
//     try {
//         const jobId = req.params.id;

//         const job = await Job.findById(jobId).populate({
//             path: 'Applications',
//             options: { sort: { createdAt: -1 } },
//             populate: {
//                 path: 'applicant'
//             }
//         });

//         if (!job) {
//             return res.status(404).json({
//                 message: "Job not found",
//                 success: false
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             job
//         });

//     } catch (error) {
//         return res.status(500).json({
//             message: error.message,
//             success: false
//         });
//     }
// };


// // ================= UPDATE APPLICATION STATUS =================
// export const updateStatus = async (req, res) => {
//     try {
//         const { status } = req.body;
//         const applicationId = req.params.id;

//         if (!status) {
//             return res.status(400).json({
//                 message: "Status is required",
//                 success: false
//             });
//         }

//         const application = await Application.findById(applicationId);

//         if (!application) {
//             return res.status(404).json({
//                 message: "Application not found",
//                 success: false
//             });
//         }

//         application.status = status.toLowerCase();
//         await application.save();

//         return res.status(200).json({
//             message: "Status updated successfully",
//             success: true,
//             application
//         });

//     } catch (error) {
//         return res.status(500).json({
//             message: error.message,
//             success: false
//         });
//     }
// };



import { Application } from '../models/application.model.js';
import { job as Job } from '../models/job.model.js';


// ================= APPLY JOB =================
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required",
                success: false
            });
        }

        const existingApplication = await Application.findOne({
            applicant: userId,
            job: jobId
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        // FIXED
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Application submitted successfully",
            success: true,
            application: newApplication
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};


// ================= GET USER APPLIED JOBS =================
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;

        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                populate: {
                    path: 'company'
                }
            });

        if (!applications || applications.length === 0) {
            return res.status(404).json({
                message: "No applications found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Applications found",
            success: true,
            applications
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};


// ================= GET APPLICATIONS (ADMIN) =================
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: 'applications', // FIXED
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            success: true,
            job
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};


// ================= UPDATE APPLICATION STATUS =================
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false
            });
        }

        const application = await Application.findById(applicationId);

        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            });
        }

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully",
            success: true,
            application
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};