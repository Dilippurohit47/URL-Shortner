import React, { useState } from "react";
import { BarLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { getUrls } from "@/db/apiUrls";
import { urlState } from "@/context";
import { getClicks } from "@/db/apiClicks";
import { useEffect } from "react";
import LinkCard from "@/components/linkCard";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState();

  const { user } = urlState();

  const {
    loading,
    error,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);

  const {
    loading: loadingClicks,
    data: Clicks,
    fn: fnclicks,
  } = useFetch(
    getClicks,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) {
      fnclicks();
    }
  }, [urls?.length]);

  const filterUrls = urls?.filter((url) =>
    url?.title?.toLowerCase().includes(searchQuery?.toLowerCase())
  );
console.log(urls)
  return (
    <div className="flex flex-col gap-8 pl-20">
      {(loading || loadingClicks) && <BarLoader width={"100%"} color="blue" />}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{Clicks?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold ">My Links</h1>
        <Button>Create Links</Button>
      </div>

      <div className="relative">
        <Input
          type="text"
          placeholder="filter links"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
{
  (filterUrls || []).map((url,i) =>{
    return <LinkCard fetchUrls={fnUrls} key={i}  url={url}/>
  })
}
    </div>
  );
};

export default Dashboard;
