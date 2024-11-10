import React, {useCallback, useEffect} from 'react';
import {getAllExhibits} from "../api/actions/exhibit.api";
import {Typography} from '@mui/material';
import {PostsList} from "../components/PostsList";
import PageFrame from "../components/PageFrame";
import {AllExhibitResponse} from "../common/types/exhibit/allExhibitResponse.type";
import {useRequest} from "ahooks";
import {useSocket} from "../hooks/hooks";
import {AxiosResponse} from "axios";

const StripePage = () => {

    const [data, setData] = React.useState<AllExhibitResponse>({
        data: [],
        total: 0,
        page: "1",
        lastPage: 0
    });

    const {loading, run} = useRequest(
        () => getAllExhibits(Number(data.page), 10),
        {
            manual: true,
            onSuccess: (data: AxiosResponse<AllExhibitResponse>) => {
                setData(data.data)
            },
        }
    );

    const fetchPosts = useCallback(() => {
        run();
    }, [run]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const setPage = async (page: number) => {
        const res = await getAllExhibits(Number(page), 10);
        setData(res.data);
    }

    useSocket(fetchPosts);

    return (
        <PageFrame>
            <Typography variant="h4" gutterBottom>All Posts</Typography>
            <PostsList
                page={data.page.toString()}
                loading={loading}
                refreshList={fetchPosts}
                totalPages={data.lastPage}
                exhibits={data.data}
                setPage={setPage}
            />
        </PageFrame>
    );
};

export default StripePage;