export const isToday = (date) => {
    const target = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date(date));

    const today = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(Date.now());

    return target == today;
};

export const formatDate = (date) => {
    return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date(date));
};

export const formatDateTime = (date) => {
    return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(new Date(date));
};

export const formatTime = (date) => {
    return new Intl.DateTimeFormat('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(new Date(date));
};
