import React, { useCallback, useEffect, useRef, useState } from 'react';
import "./index.scss";
import { useDispatch } from 'react-redux';
import { getMembers, addMembers } from '../../redux/memberActions';

const Member = () => {
    const dispatch = useDispatch();
    const [member, setMember] = useState<any | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newClient, setNewClient] = useState({
        member_name: "",
        member_id: "",
        id: ""
    });
    const refPopup = useRef<HTMLDivElement | null>(null);
    const onLoad = useCallback(() => {
        getMembers().then(({ data }) => {
            setMember(data);
        });
    }, []);

    const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setNewClient(prevState => {
            return { ...prevState, [e.target.name]: e.target.value, [e.target.id]: member ? member.length + 1 : 1, id: member ? member.length + 1 : 1 };
        });
    }, [member]);

    const addMemberSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        let isValid = true;
        if (!newClient.member_name) {
            isValid = false;
        }
        if (isValid) {
            addMembers(newClient)(dispatch);
            setShowAddForm(false);
            onLoad();
        }
        onLoad();
    }, [dispatch, newClient, onLoad]);

    const clickOutside = (e: MouseEvent) => {
        if (refPopup.current && !refPopup.current.contains(e.target as Node)) {
            setShowAddForm(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", clickOutside);
        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    }, []);

    useEffect(() => {
        onLoad();
    }, [onLoad]);

    return (
        <section className='members'>
            <section className='wrapper'>
                <section className='member-bar'>
                    <section className='bar-title'>
                        <span className='title'>
                            Task Management
                        </span>
                    </section>
                    {sessionStorage.getItem("user") ?
                        <section className='member-block'>
                            {member ?
                                <section className='member-images all-member-images'>
                                    {member.map((item: any, idx: number) => {
                                        if (idx < 5) {
                                            return (<section className='member-image' style={{ "zIndex": 5 - idx }} key={idx}>
                                                <p className="all_members"> {item.member_name.slice(0, 1)} </p>
                                            </section>)
                                        } else if (member.length === idx + 1) {
                                            return (<section className='member-count' key={idx}>
                                                <span>+{idx - 4}</span>
                                            </section>)
                                        }
                                        return true
                                    })}
                                </section>
                                : null}
                            <section className='add-member' onClick={() => setShowAddForm(!showAddForm)}>
                                <span className='add-btn'>+ New Member</span>
                            </section>
                        </section> : null}
                    {showAddForm ?
                        <section ref={refPopup} className='add-popup'>
                            <h2>New Member</h2>
                            <form>
                                <section>
                                    <section>
                                        <input type="text"
                                            className='member-name'
                                            name="member_name"
                                            id="member_id"
                                            placeholder='Name'
                                            value={newClient.member_name}
                                            onChange={onInputChange} />
                                    </section>
                                </section>
                                <section className='form-btn'>
                                    <button type='button' onClick={() => setShowAddForm(false)} className='cancel'>Cancel</button>
                                    <button type='button' onClick={addMemberSubmit} className='save'>Save</button>
                                </section>
                            </form>
                        </section>
                        : null}
                </section>
            </section>
        </section>
    )
}

export default Member