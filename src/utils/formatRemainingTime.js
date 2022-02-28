const formatRemainingTime = (milliseconds) => {
    return new Date(milliseconds).toISOString().substring(14, 19);
};

export default formatRemainingTime;
