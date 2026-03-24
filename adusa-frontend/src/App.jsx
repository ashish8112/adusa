function ProfileCard({name,branch,bio})
{
    return(
      <div>
        <h2>{name}</h2>
        <p>Branch: {branch}</p>
        <p>Bio: {bio}</p>
        <SkillBadge skill={"NodeJs"}/>
        <SkillBadge skill={"MongoDB"}/>
        <SkillBadge skill={"ExpressJs"}/>
      </div>
    );
}

function WelcomeBanner({collegeName,tagline})
{
  return(
    <div>
      <h2>Welcome in {collegeName}</h2>
      <h3>Tagline : {tagline}</h3>
    </div>
  )
}
function SkillBadge({skill}){
  return(
    <>
      <pre>['{skill}']</pre>
    </>
  )
}

function App()  //or write here export default app
{
  return(
    <div>
      <WelcomeBanner collegeName="Kristu Jayanti University" tagline={"Where Coders Meet"} /> 
      <ProfileCard name="Ashu" branch="CSE" bio="I love Coding" />
      <ProfileCard name ="Rahul" branch="ECE" bio="I love businnes"/>
      <ProfileCard name ="Vikas" branch="CSE" bio="I love gym"/>
    </div>
  )
}

export default App;

//Note in props we use {} to send object or array or number for string we can use directly ""
//for object -> {{key:value}} outside specify sending other than string inside object is written

 // Tumne likha:
// skill={"NodeJs"}   // kaam karta hai but unnecessary

 // Sahi:
// skill="NodeJs"     // string = seedha quotes ✅