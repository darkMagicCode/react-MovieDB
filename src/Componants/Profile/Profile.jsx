function profile({ userData }) {
    let { email, name ,role} = userData.data
    console.log(name);
    return (<>
        <h1>{ name}</h1>
        <h1>{ email}</h1>
        <h1>{ role}</h1>
    </> );
}

export default profile;