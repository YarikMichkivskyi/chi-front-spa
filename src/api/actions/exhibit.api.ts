import {axiosInstance} from '../axiosInstance';

const getAllExhibits = async (page:number, limit:number) => {
    return await axiosInstance.get('/api/exhibits?page='+page+'&limit='+limit);
};

const getMyExhibits = async (page:number, limit:number) => {
    return await axiosInstance.get('/api/exhibits/my-posts?page='+page+'&limit='+limit);
};

const getExhibitById = async (id: string) => {
    return await axiosInstance.get(`/api/exhibits/post/${id}`);
};

const createExhibit = async (exhibitData: { description: string; image: File }) => {
    const formData = new FormData();
    formData.append('description', exhibitData.description);
    formData.append('image', exhibitData.image);

    return await axiosInstance.post('/api/exhibits', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

const deleteExhibit = async (id: string) => {
    return await axiosInstance.delete(`/api/exhibits/${id}`);
};

export {getAllExhibits, getMyExhibits, getExhibitById, createExhibit, deleteExhibit}