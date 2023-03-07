import { ProjectComponent } from "../ProjectComponent/ProjectComponent";

export const Portfolio = () => {
  return (
    <div>
      <ProjectComponent
        image={"Imagen"}
        title={"Portfolio"}
        text={
          "Web application that shows my information, skills, technologies and projects that I have made as a developer."
        }
        technologies={"Javascript | React.js | C.S.S. "}
      />
    </div>
  );
};
