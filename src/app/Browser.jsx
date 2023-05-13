import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";

const PROGRAMS = gql`
  query Programs($first: Int!, $skip: Int) {
    programs(first: $first, skip: $skip) {
      name
      id
      colorStyle
    }
  }
`;

const Browser = () => {
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { data, loading, error, fetchMore } = useQuery(PROGRAMS, {
    variables: { first: 3 },
    onCompleted: (programData) => {
      console.log("programData", programData);
      if (programData.length < 1) {
        setHasMore(false);
      }
      setOffset((oldOffset) => oldOffset + 3);
    },
  });

  console.log(data, loading, error);

  if (loading) {
    return <div>LOADING</div>;
  }

  if (error) {
    return <div>FEHLER</div>;
  }
  console.log(data);

  const { programs } = data;
  return (
    <DefaultLayout>
      <div className="py-1 px-3 flex-col space-y-4 text-light">
        <h2 className="text-2xl font-bold text-light pt-5, m-0, pt-6">
          Browse
        </h2>
        <InfiniteScroll
          dataLength={programs.length}
          next={() => {
            fetchMore({ variables: { first: 3, skip: offset } });
          }}
          hasMore={hasMore}
        >
          {programs.map((program, index) => (
            <div
              className={`${program.colorStyle} mb-4 pt-16 rounded-2xl px-4 py-3 shadow-light h-48 text-center`}
              key={`program-${index}`}
            >
              <h2 className="text-2xl font-bold">
                {" "}
                <Link to={`/program/${program.id}`}>{program.name}</Link>
              </h2>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </DefaultLayout>
  );
};

export default Browser;

/* <div className="bg-gradient-to-br from-orange to-pink pt-16 rounded-2xl   px-4 py-3 shadow-white h-48 text-center">  
          <h2 className="text-2xl font-bold">Titel des Programms</h2>
        </div> <div className="bg-gradient-to-br from-cyan to-yellowgreen pt-16 rounded-2xl px-4 py-3 shadow-white h-48 text-center">
        <h2 className="text-2xl font-bold">100 Push-Ups Challenge</h2>
        </div>
        <div className="bg-gradient-to-br from-greenblue to-seablue rounded-2xl px-4 py-3 shadow-white h-48 text-center">
        <h2 className="pt-16 text-2xl font-bold">Titel des Programms</h2>
        </div>
        <div className="bg-gradient-to-br from-orange to-pink pt-16 rounded-2xl px-4 py-3 shadow-white h-48 text-center">
        <h2 className="text-2xl font-bold">Stretch and Relax</h2>
        </div>
        <div className="bg-gradient-to-br from-cyan to-yellowgreen rounded-2xl px-4 py-3 shadow-white h-48 text-center">
        <h2 className="pt-16 text-2xl font-bold">Titel des Programms</h2>
        </div>
        <div className="bg-gradient-to-br from-orange to-pink pt-16 rounded-2xl px-4 py-3 shadow-white h-48 text-center">
          <h2 className="text-2xl font-bold">Titel des Programms</h2>
        </div>
        <div className="bg-gradient-to-br from-cyan to-yellowgreen pt-16 rounded-2xl px-4 py-3 shadow-white h-48 text-center">
          <h2 className="text-2xl font-bold">100 Push-Ups Challenge</h2>
        </div>
        <div className="bg-gradient-to-br from-greenblue to-seablue pt-16 rounded-2xl px-4 py-3 shadow-white h-48 text-center">
          <h2 className="text-2xl font-bold">Titel des Programms</h2>
        </div>
        <div className="bg-gradient-to-br from-orange to-pink pt-16 rounded-2xl px-4 py-3 shadow-white h-48 text-center">
          <h2 className="text-2xl font-bold">Stretch and Relax</h2>
        </div>
        <div className="bg-gradient-to-br from-cyan to-yellowgreen pt-16 rounded-2xl px-4 py-3 shadow-white h-48 text-center">
          <h2 className="text-2xl font-bold">Titel des Programms</h2>
        </div> */
