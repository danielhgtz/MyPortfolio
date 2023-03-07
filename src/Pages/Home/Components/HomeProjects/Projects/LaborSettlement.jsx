import { ProjectComponent } from "../ProjectComponent/ProjectComponent";

export const LaborSettlementProject = () => {
  return (
    <div>
      <ProjectComponent
        image={"Imagen"}
        title={"Labor Settlement Calculator App"}
        text={
          "Web application that calculates the exact amount to be paid when the labor relationship between an  employer and an employee ends based on Mexican regulations (Federal Labor Law)."
        }
        technologies={
          "Javascript | React | Typescrypt | C.S.S. | Node.JS | MongoDB | Express.JS"
        }
      />
    </div>
  );
};
