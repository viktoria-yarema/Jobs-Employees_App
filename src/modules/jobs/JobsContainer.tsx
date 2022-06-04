import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Divider, List } from "@mui/material";

import { selectorApp } from "../../redux/app/app.selector";
import { useFetch } from "../../hooks/useFetch";
import { ApiEnum } from "../../api/models/api.enum";
import { appAction } from "../../redux/app/app.actions";

import { JobType } from "../../enteties/entetiesJobs";
import JobItem from "../../components/JobItem";
import { getRoutes } from "../../routes/routes";
import { getJobsRepo } from "../../api/endpoints/endpoints";

const JobsContainer = () => {
  const [data, setData] = useState<JobType[] | null>(null);
  // const { response, performFetch } = useFetch<JobType>(ApiEnum.Jobs);
  // const { data } = response;
  const dispatch = useDispatch();
  const appState = useSelector(selectorApp);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    const res = await getJobsRepo();
    setData(res);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  // useEffect(() => {
  //   performFetch();
  // }, [performFetch]);

  const performFilterEmployee = (jobTitle: string) => {
    jobTitle === appState.selectedJob
      ? dispatch(appAction.filterJob(""))
      : dispatch(appAction.filterJob(jobTitle));

    if (pathname !== getRoutes().home.url) {
      navigate(getRoutes().home.url);
    }
  };

  return (
    <>
      <Typography
        data-test={"title"}
        variant="h6"
        component={"h3"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 56,
        }}
        onClick={checkFunn}
      >
        {ApiEnum.Jobs.toUpperCase()}
      </Typography>
      <Divider />
      <List data-testid="job-list">
        {data?.map(({ id, jobId, title }) => (
          <JobItem
            key={id}
            jobId={jobId}
            title={title}
            id={id}
            onClick={() => performFilterEmployee(jobId)}
            selected={jobId === appState.selectedJob}
          />
        ))}
      </List>
    </>
  );
};

export default JobsContainer;
