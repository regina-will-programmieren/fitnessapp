import { useQuery, gql } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import xclose, {
  ReactComponent as XcloseIcon,
} from "../images/svg/X-close.svg";
// import styled from '"@emotion/styled"';
// import { LoadingSpinner } from "@apollo/space-kit/Loaders/LoadingSpinner";
// { ProgramDetail } from "../components/ProgramDetail";
// import { QueryResults } from "../components/QueryResults";

// const PROGRAMS = gql`
const GET_PROGRAMS = gql`
  query getProgram($id: ID!, $first: Int) {
    program(where: { id: $id }) {
      id
      name
      colorStyle
      description
      focus
      duration
      difficulty
      workoutsWithDay(first: $first) {
        day
        workout {
          category
          colorStylew
          id
          duration
        }
      }
    }
  }
`;

const Program = () => {
  const { programId } = useParams();
  console.log(programId);
  const [hasMore, setHasMore] = useState(true);
  const { data, loading, error, refetch } = useQuery(GET_PROGRAMS, {
    variables: { id: programId, first: 3 },
  });
  console.log(data, loading, error);
  if (loading) {
    return (
      <div
        className="text-light mb-4 pt-16 px-4 py-3 shadow-light
    text-center"
      >
        LOADING
      </div>
    );
  }
  if (error) {
    return (
      <p
        className="text-light mb-4 pt-16 px-4 py-3 shadow-light
    text-center"
      >
        ERROR: {error.message}
      </p>
    );
  }
  if (!data) {
    return <p>Nothing to show...</p>;
  }
  const { program } = data;
  console.log(program);
  const { workoutsWithDay } = program;
  const { workout } = workoutsWithDay[0];
  return (
    <div>
      <Link to="/browser" className="fixed top-5 right-5">
        <XcloseIcon />
      </Link>
      <div className={`${program.colorStyle} h-[75vh] w-screen text-light`}>
        <h1 className=" text-center pt-60">{program.name}</h1>
        <div className="flex justify-around gap-5 pt-32 ">
          <div className="flex flex-col items-center">
            <img src="../images/svg/Ellipse 1.svg"></img>
            <p className="mb-4 mt-2 text-center uppercase">{program.focus}</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="../images/svg/Ellipse 1.svg"></img>
            <p className="mb-4 mt-2 text-center uppercase text-light">
              {program.difficulty}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img src="../images/svg/Ellipse 1.svg"></img>
            <p className="mb-4 mt-2 text-center uppercase">
              {program.duration} Wochen
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Link
          to={`/program/${program.id}/workout/${workout.id}/start`}
          className={`${program.colorStyle} text-light rounded-3xl fixed px-4 py-3 bottom-8 shadow-md z-[12]`}
        >
          <p>jetzt starten</p>
        </Link>
      </div>
      <div className="bg-medium_dark">
        <p className="px-6 py-5 text-light">{program.description}</p>
      </div>
      <div className="px-6 mt-6 bg-dark text-light">
        <h3>So ist das Programm aufgeteilt:</h3>
        <div className="flex items-center mt-10 gap-5">
          <img src="../images/svg/Figpie.svg"></img>
          <div className="ml-6 flex flex-col gap-5">
            <div className="flex gap-3">
              <img src="../images/svg/Ellipse 6.svg"></img>
              <p className="text-xs">Krafttraining</p>
            </div>
            <div className="flex gap-3">
              <img src="../images/svg/Ellipse 6.svg"></img>
              <p className="text-xs">Koordination</p>
            </div>
            <div className="flex gap-3">
              <img src="../images/svg/Ellipse 6.svg"></img>
              <p className="text-xs">Cardio</p>
            </div>
            <div className="flex gap-3">
              <img src="../images/svg/Ellipse 6.svg"></img>
              <p className="text-xs">Beweglichkeit</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-14 px-6 py-4 flex justify-between items-baseline text-light">
        <h3>{workoutsWithDay.length} Tage</h3>
        {/* hier wird durch die Und-Abfrage sichergestellt, dass der Button verschwindet/ nicht erscheint, wenn eine der beiden Bedingungen nicht mehr erfüllt ist // undefined sorgt in diesem Fall dafür, dass alle restlichen Workouts geladen werden, anschließend hasMore auf false gesetzt */}
        {hasMore && (
          <button
            onClick={() => {
              refetch({ first: undefined });
              setHasMore(false);
            }}
            className="text-xs bg-dark"
          >
            Alle anzeigen
          </button>
        )}
      </div>
      <div>
        <div className="text-light h-[100px] w-[335px] ml-5 mr-9 my-4 mb-40">
          {workoutsWithDay.map((workoutWithDay, index) => (
            <div key={`workout-${index}`} className="flex  justify-center mb-3">
              <div
                className={`${workoutWithDay.workout.colorStylew} inline-block rounded-l-2xl w-1/4 h-[100px]`}
              ></div>
              <div className="bg-medium_dark inline-block rounded-r-2xl w-3/4 pr-6 h-[100px]">
                <div className="ml-3.5 py-2.5">
                  <h3>Tag {workoutWithDay.day}</h3>
                  <p className="text-xs mt-6">
                    {workoutWithDay.workout.duration} Min.
                  </p>
                  <p className="text-xs">{workoutWithDay.workout.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Program;
/*     <div className=" flex justify-center align-middle w-3 h-3">
        <LoadingSpinner data-testid="spinner" size="large" theme="grayscale" />;
      </div> */
