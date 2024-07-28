import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FetchUserObj, FunctionUpdateUser } from "../Redux/Action";

const Updateuser = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { code } = useParams();

    const userobj = useSelector((state) => state.user.userobj);

    const handlesubmit = (e) => {
        e.preventDefault();
        const userObj = { id, name, email, phone };
        dispatch(FunctionUpdateUser(userObj, id));
        navigate('/user');
    }

    useEffect(() => {
        if (code) {
            dispatch(FetchUserObj(code));
        }
    }, [code, dispatch]);

    useEffect(() => {
        if (userobj) {
            console.log("User object fetched: ", userobj); // Debugging log
            setId(userobj.id);
            setName(userobj.name);
            setEmail(userobj.email);
            setPhone(userobj.phone);
        }
    }, [userobj]);

    return (
        <div>
            <form onSubmit={handlesubmit}>
                <div className="card">
                    <div className="card-header" style={{ textAlign: 'left' }}>
                        <h2>Update User</h2>
                    </div>
                    <div className="card-body" style={{ textAlign: 'left' }}>
                        <div className="row">
                            {/* <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Id</label>
                                    <input value={id || ''} disabled className="form-control"></input>
                                </div>
                            </div> */}
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input value={name} onChange={e => setName(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input value={email} onChange={e => setEmail(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input value={phone} onChange={e => setPhone(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer" style={{ textAlign: 'left' }}>
                        <button className="btn btn-primary" type="submit">Submit</button> |
                        <Link className="btn btn-danger" to={'/user'}>Back</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Updateuser;
