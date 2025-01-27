import React, { useEffect, useState } from 'react';
import { Nav, Navbar, Dropdown } from 'react-bootstrap-v5';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/react';

import {
    faMaximize,
    faMinimize,
    faUser,
    faLock,
    faRightFromBracket,
    faAngleDown,
    faBell, faLanguage
} from '@fortawesome/free-solid-svg-icons';

import { getAvatarName, getFormattedMessage } from '@/Helpers/Helpers';

const Header = (props) => {
    const { user } = props;
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [deleteModel, setDeleteModel] = useState(false);
    const [languageModel, setLanguageModel] = useState(false);

    const onLogOut = () => {
        // navigate('/login');
    };

    const fullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    useEffect(() => {
        console.log(user);
    }, [])

    const onClickDeleteModel = () => {
        setDeleteModel(!deleteModel);
    };

    const onClickLanguageModel = () => {
        setLanguageModel(!languageModel);
    };

    const onProfileClick = () => {
        // window.location.href = '#/app/profile/edit';
    };

    return (
        <Navbar collapseOnSelect expand='lg' className='align-items-stretch ms-auto py-1'>
            <div className='d-flex align-items-stretch justify-content-center'>
                <Nav className='align-items-stretch justify-content-between flex-row'>
                    <ul className='nav align-items-center'>
                        <li>

                        </li>
                        {isFullscreen === true ?
                            <li className="px-sm-3 px-2" onClick={() => fullScreen()}>
                                <FontAwesomeIcon icon={faMinimize} className='text-primary fs-2' />
                            </li>
                            :
                            <li className="px-sm-3 px-2" onClick={() => fullScreen()}>
                                <FontAwesomeIcon icon={faMaximize} className='text-primary fs-2' />
                            </li>
                        }
                    </ul>
                    <Dropdown className='d-flex align-items-stretch'>
                        <Dropdown.Toggle className='hide-arrow bg-transparent border-0 p-0 d-flex align-items-center'
                            id='dropdown-basic'>
                            <div className='d-flex align-items-center justify-content-center'>
                                {/* {imageUrl || image ?
                                    <Image src={imageUrl ? imageUrl : image || User}
                                        className='image image-circle image-tiny'
                                        alt='user-avatar' height='50' width='50' />
                                    :
                                    <span className='custom-user-avatar'>
                                        {getAvatarName(updatedFirstName && updatedLastName ? updatedFirstName + ' ' + updatedLastName : firstName + ' ' + lastName)}
                                    </span>
                                }
                                <span
                                    className='ms-2 text-gray-600 d-none d-sm-block'>
                                    {updatedFirstName && updatedLastName ? <>{updatedFirstName + ' ' + updatedLastName}</> : <> {firstName + ' ' + lastName}</>}
                                </span> */}

                                <span className='custom-user-avatar'>
                                    {getAvatarName(user?.first_name + ' ' + user?.last_name)}
                                </span>
                                <span
                                    className='ms-2 text-gray-600 d-none d-sm-block'>
                                    {user?.first_name + ' ' + user?.last_name}
                                </span>
                            </div>
                            <FontAwesomeIcon icon={faAngleDown} className="text-gray-600 ms-2 d-none d-sm-block" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <div className='text-center pb-1 border-bottom mb-4'>
                                <div className='text-center text-decoration-none pb-5 w-100 align-items-center'>
                                    <div className='image image-circle w-100 image-tiny pb-5'>
                                        {/* {imageUrl || image ?
                                            <img src={imageUrl ? imageUrl : image}
                                                className='img-fluid' height='50' width='50' alt='user-avatar' /> :
                                            <span className='user_avatar mx-auto'>
                                                {getAvatarName(updatedFirstName && updatedLastName ? updatedFirstName + ' ' + updatedLastName : firstName + ' ' + lastName)}
                                            </span>
                                        } */}

                                        <span className='user_avatar mx-auto'>
                                            {getAvatarName(user?.first_name + ' ' + user?.last_name)}
                                        </span>
                                    </div>
                                    <div className='d-flex flex-column'>
                                        <h3 className='text-gray-900'>
                                            {user.first_name} {user.last_name}
                                        </h3>
                                        <h4 className='mb-0 fw-400 fs-6'>
                                            {user.email}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <Dropdown.Item
                                onClick={(e) => onProfileClick(e)}
                                className='px-5 fs-6'>
                                <span className='dropdown-icon me-4 text-gray-600'>
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                                {getFormattedMessage('header.profile-menu.profile.label')}</Dropdown.Item>
                            <Dropdown.Item onClick={onClickDeleteModel}
                                className='px-5 fs-6'>
                                <span className='dropdown-icon me-4 text-gray-600'>
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                                {getFormattedMessage('header.profile-menu.change-password.label')}
                            </Dropdown.Item>
                            <Dropdown.Item onClick={onClickLanguageModel}
                                className='px-5 fs-6'>
                                <span className='dropdown-icon me-4 text-gray-600'>
                                    <FontAwesomeIcon icon={faLanguage} />
                                </span>
                                {getFormattedMessage('header.profile-menu.change-language.label')}
                            </Dropdown.Item>
                            <Dropdown.Item
                                className='px-5 fs-6'>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                >
                                    <span className='dropdown-icon me-4 text-gray-600'>
                                        <FontAwesomeIcon icon={faRightFromBracket} />
                                    </span>
                                    {getFormattedMessage('header.profile-menu.logout.label')}
                                </Link>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </div>
        </Navbar>
    )
};

export default Header;
