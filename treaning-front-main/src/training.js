import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";





// function Training() {
//     return (
//         <div>
//             <div id="aaa"></div>
//             <h1>Training x :</h1> 
//             {/* {console.log(aaa)} */}
//             {/* <button onClick={}>+</button> */}
//             {/* <button onClick={this.props.decrument}>-</button> */}


//         </div>
//     )
// }

// function mapStateToProps(state){
//     return {
//         x:state.x
//     }
// }

// function mapDispatchToProps(dispatch){
//     return{
//         incrument:()=>dispatch({type:"INCREMENT"}),
//         decrument:()=>dispatch({type:"DECREMENT"})

//     }
// }




// export default connect(mapStateToProps,mapDispatchToProps)(Training);


const USER_REGEX = /^[أ-يa-zA-Z][أ-يa-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

function Training() {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus();
    }, [])
    useEffect(() => {
        const result = USER_REGEX.test(user)
        console.log(result)
        console.log(user)
        setValidName(result)
    }, [user])
    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        console.log(result)
        console.log(pwd)
        setValidPwd(result)
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user)
        const v2 = PWD_REGEX.test(pwd)
        if (!v1 || !v2) {
            setErrMsg("Invalid Enter");
            return;
        }
        // try {
        //     const response = await axios.post("http://localhost:3333/createuser", PostData)
        //         .then((res) => window.location.replace("/Home2"))
        //         .catch((err) => console.log("err post : ", err))
        // }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            UserName :
                            <span className={validName ? 'valid' : 'hide'}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validName || !user ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={e => setUser(e.target.value)}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}></input>
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 charctters. <br />
                            must begin with a letter. <br />
                            letters , numbers , underscores , hyphens allowed
                        </p>
                        <label htmlFor="password">
                            password :
                            <span className={validPwd ? 'valid' : 'hide'}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validPwd || !pwd ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            // ref={userRef}
                            // autoComplete="off"
                            onChange={e => setPwd(e.target.value)}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="Pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}></input>
                        <p id="Pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 charctters. <br />
                            must begin with a letter. <br />
                            letters , numbers , underscores , hyphens allowed
                        </p>
                        <label htmlFor="confirm_pwd">
                            confirm password :
                            <span className={validMatch && matchPwd ? 'valid' : 'hide'}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            // ref={userRef}
                            // autoComplete="off"
                            onChange={e => setMatchPwd(e.target.value)}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}></input>
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 charctters. <br />
                            must begin with a letter. <br />
                            letters , numbers , underscores , hyphens allowed
                        </p>
                        <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>
                </section>
            )}
        </>
    )
}


