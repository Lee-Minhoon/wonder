import axios from "axios";

const signup = (id, password, check, nickname) => {
    if (validate(id, password, check, nickname)) {
        axios
            .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, null, {
                params: {
                    id: id,
                    password: password,
                    nickname: nickname,
                },
            })
            .then((reponse) => {
                console.log(reponse);
                // alert(`${reponse.data.nickname}님 가입을 환영합니다.`);
                return true;
            });
    } else {
        console.log("test");
        return false;
    }
};

const validate = (id, password, check, nickname) => {
    if (!id || !password || !nickname) {
        alert("빈 칸이 있습니다.");
        return false;
    } else if (password.length < 8) {
        alert("비밀번호를 8자 이상 입력하세요.");
        return false;
    } else if (password != check) {
        alert("비밀번호가 일치하지 않습니다.");
        return false;
    }
    return true;
};

export default signup;
