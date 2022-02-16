// import package, library
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

// import utilities
import useUpdateMe, { updateMeInput } from 'hooks/user/useUpdateMe';
import useReadMe from 'hooks/user/useReadMe';
import useInputWithSetValue from 'hooks/useInputWithSetValue';

// import components
import Button from 'components/Button';
import Divider from 'components/Divider';
import Loading from 'components/Loading';
import Requesting from 'components/Requesting';

// import etc
import styles from './styles.module.scss';

const BasicInfoModify = () => {
    const [profileImageFile, setProfileImageFile] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState('/defaultProfile.png');
    const profileInputRef = useRef<HTMLInputElement>();
    const updateMe = useUpdateMe();
    const nickname = useInputWithSetValue('');
    const intro = useInputWithSetValue('');

    console.log('test');

    const {
        data: userData,
        error: userError,
        isLoading: userIsLoading,
        isSuccess: userIsSuccess,
        isError: userIsError,
        refetch: userRefetch,
    } = useReadMe();

    const handleProfileClick = useCallback(async (e) => {
        e.preventDefault();
        profileInputRef.current.click();
    }, []);

    const handleImageChange = useCallback(async (e) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        if (file) {
            reader.readAsDataURL(file);
        }
        reader.onload = () => {
            setProfileImageFile(file);
            setProfileImagePreview(reader.result);
        };
    }, []);

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('profileImageFile', profileImageFile);
            formData.append('password', e.target.password.value);
            formData.append('nickname', nickname.value);
            formData.append('intro', intro.value);

            const updaupdateMeInputValue: updateMeInput = {
                formData: formData,
            };
            updateMe.mutate(updaupdateMeInputValue);
        },
        [intro.value, nickname.value, profileImageFile, updateMe]
    );

    useEffect(() => {
        userRefetch();
    }, [userRefetch]);

    useEffect(() => {
        if (userData?.data && userIsSuccess) {
            if (userData?.data.profileImageUrl) setProfileImagePreview(userData?.data.profileImageUrl);
            nickname.setValue(userData?.data.nickname);
            if (userData?.data.intro) intro.setValue(userData?.data.intro);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData?.data, userIsSuccess]);

    useEffect(() => {
        if (updateMe?.data && updateMe.isSuccess) alert('프로필을 수정하였습니다.');
    }, [updateMe?.data, updateMe.isSuccess]);

    return (
        <>
            {updateMe.isLoading && <Requesting />}
            {userIsLoading && <Loading />}
            {userIsError && <p>{userError.response.data?.message}</p>}
            {userIsSuccess && (
                <div className={styles.basicInfoModify}>
                    <header>
                        <h1>기본 정보 수정</h1>
                        <Divider />
                    </header>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.profile}>
                            <div className={styles.imageWrapper}>
                                <figure>
                                    <Image src={profileImagePreview} priority={true} alt="profile" layout="fill" />
                                </figure>
                            </div>
                            <input type="file" name="profileInput" ref={profileInputRef} onChange={handleImageChange} />
                            <Button onClick={handleProfileClick}>프로필 사진 선택</Button>
                        </div>
                        <div className={styles.basicInfo}>
                            <div>
                                <label>아이디</label>
                                <em>{userData.data.email}</em>
                            </div>
                            <div className={styles.inputWrapper}>
                                <label>비밀번호</label>
                                <input type="password" name="password" />
                            </div>
                            <div className={styles.inputWrapper}>
                                <label>비밀번호 확인</label>
                                <input type="password" />
                            </div>
                            <div className={styles.inputWrapper}>
                                <label>닉네임</label>
                                <input type="text" name="nickname" {...nickname} />
                            </div>
                            <div className={styles.introWrapper}>
                                <label>소개</label>
                                <textarea placeholder="내용을 입력하세요." {...intro} />
                            </div>
                        </div>
                        <div className={styles.buttonWrapper}>
                            <Button>수정 완료</Button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default BasicInfoModify;
