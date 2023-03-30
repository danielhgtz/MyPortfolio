export const navigateTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const navToAbout = (homeAboutRef) => {
  homeAboutRef.current?.scrollIntoView({ behavior: "smooth" });
};

export const navToSkillsAndSoftwares = (homeSkillsRef) => {
  homeSkillsRef.current?.scrollIntoView({ behavior: "smooth" });
};

export const navToProjects = (homeProjectsRef) => {
  homeProjectsRef.current?.scrollIntoView({
    behavior: "smooth",
  });
};
