import React from 'react';
import set from 'lodash.set';
import {renderToStaticMarkup} from 'react-dom/server'

import Resume from 'components/resume/Resume';

const initialState = {
    resume: {
        data: {
            name: 'Kanoa Haley',
            title: 'Software Developer',
            contact: [
                {
                    icon: 'fas fa-at',
                    link: 'mailto:khaley@uoguelph.ca',
                    label: 'khaley@uoguelph.ca'
                },
                {
                    icon: 'fas fa-phone',
                    link: 'tel:+12268686888',
                    label: '(226) 868-6888'
                },
                {
                    icon: 'fab fa-github',
                    link: 'https://github.com/evilkanoa',
                    label: 'evilkanoa'
                },
                {
                    icon: 'fab fa-linkedin-in',
                    link: 'https://www.linkedin.com/in/kanoahaley',
                    label: 'Kanoa Haley'
                }
            ],
            details: [
                {
                    type: 'summary',
                    label: 'Profile',
                    summary: 'Seeking a high-speed software development position that encourages constant learning and requires bountiful creativity. Getting my toes wet in the world of software development left me with a powerful passion and drive to innovate, create, and improve. I have a strong skill set in mobile and web development, with recent specializations in full-stack, JavaScript-based micro-service development.'
                },
                {
                    type: 'skills',
                    skillsets: [
                        {
                            label: 'Languages',
                            skills: 'JavaScript, Kotlin, Java, C'
                        },
                        {
                            label: 'Frameworks',
                            skills: 'React, Redux, Android, Angular'
                        },
                        {
                            label: 'Tools',
                            skills: 'Node, Git, MongoDB, Postgres, Redis, tmux, Mercurial'
                        }
                    ]
                },
                {
                    type: 'details',
                    label: 'Interests',
                    items: [
                        {
                            title: 'Climbing',
                            description: 'Involved in competitive climbing from 12 - 18 years old. Nowadays I spend my time on big wall traditional and alpine climbing. I have completed many Grade III routes that involve at least eight hours of time on the wall and generally are over 200m tall.'
                        },
                        {
                            title: 'Slacklining',
                            description: 'Started slacklining in the summer of 2017, finished my first highline in spring of 2018, and started a Guelph-based slackline group in fall of 2018.'
                        }
                    ]
                },
                {
                    type: 'details',
                    label: 'Awards',
                    items: [
                        {
                            title: 'Code to Win',
                            description: 'Placed in finals for the past two years.'
                        },
                        {
                            title: 'Climbing',
                            description: 'Placed 2nd provincially for two years consecutively in 2015 to 2016 and placed 22nd nationally in 2016.'
                        }
                    ]
                }
            ],
            events: [
                {
                    label: 'Experience',
                    icon: 'fas fa-briefcase',
                    items: [
                        {
                            title: 'Software Developer',
                            subtitle: 'MappedIn',
                            date: 'May 2018 .. Dec 2018',
                            details: [
                                `Improved and maintained over <strong>5 micro-services</strong> for <strong>map design, maintenance, and deployment</strong> software in numerous techologies including <strong>React, Redux, NodeJS, Express, MongoDB, and Redis</strong>.`,
                                `Refactored an <strong>internal platform model</strong> to improve data organization and relations requiring changes to over <strong>600 venues</strong> that resulted in the cleanup and removal of over <strong>100 entities of previously duplicated data</strong>.`,
                                `Created a <strong>concept of time</strong> within the company's data to allow clients access to events. <strong>Events and time-based states</strong> are now used by over <strong>50% of clients</strong> and allowed a <strong>decrease in data editing times</strong> overall.`
                            ]
                        },
                        {
                            title: 'Outdoor Guide',
                            subtitle: 'One Axe Pursuits',
                            date: 'May 2017 .. Sept 2018',
                            details: [
                                `Efficiently rigged and maintained two separate <strong>zip-line and rappel systems</strong>.`,
                                `<strong>Improved rigging efficiency</strong> by <strong>50%</strong> for the daily zip-line setup.`,
                                `Managed <strong>waivers and liability forms</strong> and performed cashier duties with daily incomes over <strong>$2,000</strong>.`,
                                `Interacted with and geared up customers, with daily averages of over <strong>50 people</strong>.`
                            ]
                        },
                        {
                            title: 'Software Developer',
                            subtitle: 'Zeitspace',
                            date: 'May 2017 .. Sept 2017',
                            details: [
                                `Developed three <strong>full-stack applications</strong> in <strong>React, AngularJS, and Angular 2</strong> with each supporting upwards of <strong>5,000 users</strong>.`,
                                `Worked as an <strong>Agile team member</strong> on one on-site team and two off-site teams.`,
                                `Creatively designed and taught workshops for programming in modern languages such as <strong>Kotlin</strong> for <strong>Zeitspace Sessions</strong> with groups of <strong>ten to twenty developers</strong>.`,
                                `Personally worked with clients on two projects to <strong>iteratively improve and refine</strong> an <strong>Android</strong> and a <strong>Web</strong> experience, respectively.`
                            ]
                        },
                        {
                            title: 'Software Architect',
                            subtitle: 'GamED Academy',
                            date: 'May 2014 .. Sept 2016',
                            description: 'Served an online, elementary school level curriculum to students through the video game Minecraft.',
                            details: [
                                `Lead development of two <strong>full-stack education software suites</strong> for use by teachers with support for over <strong>2,500 students</strong>.`,
                                `Interacted with <strong>hundreds of students</strong> to gain insight into development requirements producing over <strong>ten customized applications</strong> to improve the learning experience.`,
                                `<strong>Decreased adminstration effort</strong> by over <strong>90%</strong> and increased the <strong>maximum students per semester</strong> by a <strong>factor of ten</strong> from 200 to over 2,500.`
                            ]
                        },
                        {
                            title: 'Digital Marketing',
                            subtitle: 'TrafficSoda',
                            date: 'July 2015 .. Aug 2015',
                            details: [
                                `Deployed and administered over <strong>100 websites</strong>.`,
                                `Collaborated with multiple other companies in <strong>The Accelerator Centre</strong>, a start-up incubator.`
                            ]
                        }
                    ]
                },
                {
                    label: 'Education',
                    icon: 'fas fa-graduation-cap',
                    items: [{
                        title: 'Computer Science',
                        subtitle: 'University of Guelph',
                        date: 'Sept 2016 .. Apr 2021',
                        description: 'Bachelors of Computing, Computer Science (Co-op) <br/> Mathematics minor',
                        details: [
                            'Received the <strong>University of Guelph Entrance Scholarship</strong>; admission average above 90%.',
                            'Received the <strong>Specialist High Skills Major Scholarship</strong> in Information and Communications Technology.'
                        ]
                    }]
                }
            ]
        }
    },
    render: ''
};

// selectors
export const getResumeData = (state) => state.resume;
export const getRender = (state) => state.render;

// action-creators
export const setResume = (data) => ({
    type: 'SET_RESUME',
    data
});
export const setResumeData = (path, data) => ({
    type: 'SET_RESUME_DATA',
    path,
    data
});
export const renderResume = () => async (dispatch, getState) => {
    const input = getResumeData(getState());
    const data = await renderToStaticMarkup(
        <Resume data={input.data}/>
    );

    dispatch({
        type: 'SET_RENDER_RESULT',
        data
    });

    return data;
};

// reducer
export default (state = initialState, { type, ...action }) => {
    switch (type) {
        case 'SET_RESUME': return {
            ...state,
            resume: action.data
        };

        case 'SET_RESUME_DATA': return {
            ...state,
            resume: {
                ...state.resume,
                data: set({ ...state.resume.data }, action.path, action.data)
            }
        };

        case 'SET_RENDER_RESULT': return {
            ...state,
            render: action.data
        };

        default: return {
            ...state
        };
    }
};
