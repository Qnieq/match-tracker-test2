interface IStatusConvert {
  status: string;
}

export const statusConvert = (status: string): IStatusConvert => {
  switch (status) {
    case "Finished":
      return { status: "Finished" };
    case "Ongoing":
      return { status: "Live" };
    case "Scheduled":
      return { status: "Match preparing" };
    default:
      return { status: "All" };
  }
};
