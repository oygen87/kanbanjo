export const bgColor = (color) => {
    switch (color) {
        case "green":
            return "bg-success";
        case "blue":
            return "bg-info";
        case "yellow":
            return "bg-warning";
        case "red":
            return "bg-danger";
        default:
            return "";
    }
};

export const sortByOrderProp = (a, b) => {
    return b.order < a.order ?  -1 : b.order > a.order ? 1 : 0;
};