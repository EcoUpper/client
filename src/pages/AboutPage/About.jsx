import "./AboutPage.css"
import EdnaImg from "./../../images/Edna.png"
import ErikImg from "./../../images/Erik.png"
import JDImg from "./../../images/JD.png"
import OscarImg from "./../../images/Oscar.png"

function About() {
  return (
    <div className="containerAbout">
      <h1 className="title">Get into the green scene</h1>

      <div className="introAbout">
        <p>
          Welcome to EcoUpper, the social media platform dedicated to
          sustainability, community building, and making our planet a better
          place. We believe that small, collective actions can create a big
          impact, and our platform is designed to empower individuals and
          communities to come together for a greener, more sustainable future.<br/>
      
          <h3><strong className="strongColor">Our Vision</strong></h3>
          
          Our mission is to provide a digital space where you can connect with
          like-minded individuals, share ideas, exchange items, and organize
          events that contribute to a more sustainable lifestyle.<br/>
          
          <h3><strong className="strongColor">Our Commitment</strong></h3>
          
          We are deeply committed to sustainability and eco-conscious living.
          Our app is built on the principles of reducing waste, promoting reuse,
          and fostering a sense of belonging within your community. We believe
          that by working together, we can make a real difference.<br/>
        </p>

      </div>
      
          <div className="featsAbout"><h3><strong className="strongColor">Key Features</strong></h3>
        
          <strong className="strongColor">Create Your Sustainable Community:</strong>Whether you're passionate about
          reducing plastic waste, promoting clean energy, or supporting local
          farmers, EcoUpper allows you to create or join communities that
          align with your interests and values. Connect with individuals who
          share your passion and drive for positive change.<br/>
          <br/>
          <strong className="strongColor">Exchange Items:</strong> One person's trash is another person's treasure! Our platform lets you
          easily exchange or donate items you no longer need. From clothing
          swaps to book exchanges, it's a win-win for you and the environment.<br/>
          <br/>
          <strong className="strongColor">Organize Sustainable Events:</strong> Planning a neighborhood cleanup, tree
          planting, or a workshop on sustainable gardening? EcoUpper makes it
          simple to create and promote events that bring your community together
          for a common cause.<br/>
          <br/>
          <strong className="strongColor">Share Your Sustainable Journey:</strong> Inspire and be
          inspired! Share your sustainable lifestyle, tips, and experiences with
          your followers. Whether you're reducing your carbon footprint or
          adopting zero-waste practices, your journey can inspire others to take
          action.<br/>
          </div>

      <div className="joinAbout">
        <p>
          <h3><strong className="strongColor">Make a Difference</strong></h3>
          
          EcoUpper is more than just an app - it's a movement. Join us in creating a
          global network of eco-conscious individuals and communities who are
          dedicated to making sustainability a way of life.<br/>
          <br/>
          Thank you for being a part of our community. Together, we can turn the tide and make the
          world a better place for generations to come. Join us on EcoUpper
          and let's create a greener, more sustainable future, one step at a
          time. Together, we can make a world of difference.
         </p>
        </div>

      <div className="teamAbout">
          <h1> <strong className="strongColor">EcoUppers</strong></h1>
        <div className="membersContainer">
          <div className="teamMember">
            <img src={EdnaImg} alt="Edna" />
            <h3>Edna Vidal</h3>
            <p><strong>CEO</strong></p>
          </div>
          <div className="teamMember">
            <img src={ErikImg}alt="" />
            <h3>Erik Arvid</h3>
            <p><strong>CTO</strong></p>
          </div>
          <div className="teamMember">
            <img src={JDImg} alt="" />
            <h3>Juan David Valencia</h3>
            <p><strong>Design</strong></p>
          </div>
          <div className="teamMember">
            <img src={OscarImg}alt="" />
            <h3>Óscar Mesejo</h3>
            <p><strong>Design</strong></p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;
