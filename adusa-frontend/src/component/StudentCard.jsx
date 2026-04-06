function StudentCard({name,college,branch,bio="No bio Yet"})
{
    return (
        <div className="info">
            <h2>{name}</h2>
            <p>College: {college}</p>
            <p>Branch : {branch}</p>
            <p>Bio :{bio}</p>
        </div>
    );
}

export default StudentCard;