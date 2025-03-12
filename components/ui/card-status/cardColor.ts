interface ICardColor {
  bgColor: string;
  status: string;
}

export const cardColor = (status: string): ICardColor => {
  switch (status) {
    case "Finished":
      return { bgColor: "bg-[#EB0237]", status: "Finished" };
    case "Ongoing":
      return { bgColor: "bg-[#43AD28]", status: "Live" };
    case "Scheduled":
      return { bgColor: "bg-[#EB6402]", status: "Match preparing" };
    default:
      return { bgColor: "bg-[#5A5A5A]", status: "Soon..." };
  }
};
