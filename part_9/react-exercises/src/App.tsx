import { type } from "node:os";
import React, { Fragment } from "react";

const Header = ({ courseName }: { courseName: string }) => (
  <h1>{courseName}</h1>
);

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((coursePart) => (
        <Part key={coursePart.name} coursePart={coursePart} />
      ))}
    </>
  );
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.type) {
    case "normal": {
      return (
        <>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <p>{coursePart.description}</p>
        </>
      );
    }
    case "special": {
      return (
        <>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <p>{coursePart.description}</p>
          <p>
            required skills:{" "}
            {coursePart.requirements.map((e) => (
              <Fragment key={e}>{" "} {e}</Fragment>
            ))}
          </p>
        </>
      );
    }
    case "groupProject": {
      return (
        <>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <p>project exercises {coursePart.groupProjectCount}</p>
        </>
      );
    }
    case "submission": {
      return (
        <>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <p>{coursePart.description}</p>
          <p>submit to {coursePart.exerciseSubmissionLink}</p>
        </>
      );
    }
    default: {
      return <></>
    }
  }
};

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => (
  <p>
    Number of exercises
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDescriptionPart extends CoursePartBase {
  description: string;
}
interface CourseNormalPart extends CourseDescriptionPart {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSpecialPart extends CourseDescriptionPart {
  type: "special";
  requirements: string[];
}

interface CourseSubmissionPart extends CourseDescriptionPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the leisured course part",
    type: "normal",
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the harded course part",
    type: "normal",
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: "groupProject",
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: "submission",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    type: "special",
  },
];

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
