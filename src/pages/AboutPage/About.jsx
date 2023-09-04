import "./AboutPage.css"

function About (){
    return (
        <>
        <h1>About Page</h1>
        <p>This is the About Page</p>
        <section>
    <h2>Our Story</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in mauris eu nulla convallis tristique. Sed semper massa at dui volutpat, vitae finibus lorem aliquam. Curabitur blandit, ex eu tristique feugiat, purus arcu aliquet ante, nec feugiat nisi ante eu ipsum.</p>
  </section>
  
  <section>
    <h2>Our Team</h2>
    <div class="team-member">
      <img src="Edna.JPG" alt=""/>
      <h3>Edna Vidal</h3>
      <p>Position: CEO</p>
    </div>
    <div class="team-member">
      <img src="Erik.JPG" alt=""/>
      <h3>Erik Arvid</h3>
      <p>Position: CTO</p>
    </div>

    <div class="team-member">
      <img src="Oscar.JPG" alt=""/>
      <h3>Óscar Mesejo</h3>
      <p>Position: Accountant</p>
    </div>

    <div class="team-member">
      <img src="JD.JPG" alt="Doorman photo"/>
      <h3>JuanDa</h3>
      <p>Position: Doorman</p>
    </div>
  </section>


        </>
    )

};

export default About;