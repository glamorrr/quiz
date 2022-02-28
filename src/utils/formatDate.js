const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export default formatDate;
