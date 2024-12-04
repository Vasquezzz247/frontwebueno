import { Fragment, useContext, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../../assets/img/logoSinBackground.png';
import logo2 from '../../assets/img/logo2.png';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

const navigationDoctor = [
    { name: 'Documentos', href: '/homedoc', current: false },
    { name: 'Calendario', href: '/caldoctor', current: false },
    { name: 'Solicitudes', href: '/solicitudes', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function NavbarDoc() {
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const token = Cookies.get('token');
    const navigate = useNavigate();

    const logout = () => {
        const token = localStorage.getItem('token');
        if (token) {
            localStorage.removeItem('token');
            navigate('/');
        }
    };

    const onLogout = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post(
                'https://backendweb-pzlb.onrender.com/api/auth/logout',
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (data?.error) {
                console.log(data?.error);
            } else {
                setUser(null);
                Cookies.remove('token');
                logout();
                navigate('/');
            }
        } catch (error) {
            console.error(error.response?.data?.error || error.message);
        } finally {
            setLoading(false);
        }
    };

    return loading ? (
        <p>...Loading</p>
    ) : (
        <Disclosure as="nav" className="bg-[#B5D4E9] h-16">
            {({ open }) => (
                <>
                    <div className="relative mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-[#4A90E2] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Abrir menú</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <img
                                        className="h-14 w-auto cursor-pointer"
                                        src={logo}
                                        alt="Logo"
                                        onClick={() => navigate('/homedoc')}
                                    />
                                </div>

                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-2 justify-start">
                                        {navigationDoctor.map((item) => (
                                            <button
                                                key={item.name}
                                                onClick={() => navigate(item.href)}
                                                className="mt-2 bg-[#B5D4E9] hover:bg-[#A4C4D6] px-5 py-2 text-black uppercase rounded text-xs tracking-wider ml-4"
                                                style={{ transform: 'translateY(10%)' }}
                                            >
                                                {item.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                                            <span className="sr-only">Abrir menú de usuario</span>
                                            <img
                                                className="h-6 w-6 cursor-pointer"
                                                src={logo2}
                                                alt="Logo2"
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <span
                                                        onClick={logout}
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                                        )}
                                                    >
                                                        Cerrar sesión
                                                    </span>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-2 px-2 pb-3 pt-2">
                            {navigationDoctor.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="button"
                                    onClick={() => navigate(item.href)}
                                    className="block w-full mt-4 bg-[#B5D4E9] hover:bg-[#A4C4D6] px-5 py-2 text-white uppercase rounded text-xs tracking-wider"
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
