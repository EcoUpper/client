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
          Welcome to EcoUpper, the social media platform dedicated to sustainability, community building, and making our planet a better place where small, collective actions can create a big impact.<br />

          <h3><strong>Our Vision</strong></h3>
          We aim to provide a digital space where you can connect with like-minded individuals, share ideas, exchange items, and organize events that contribute to a more sustainable lifestyle.<br />

          <h3><strong>Our Commitment</strong></h3>
          We are deeply committed to sustainability and eco-conscious living. Our app is built on the principles of reducing waste, promoting reuse, and fostering a sense of belonging within your community. We believe that by working together, we can make a real difference.<br />
        </p>

      </div>

      <div className="featsAbout"><h3><strong>Key Features</strong></h3>

        <strong>Build Your Community.</strong> Whether you're passionate about
        reducing waste, promoting clean energy, or supporting local farmers, EcoUpper is the place for you. Connect with individuals who share your passion and drive for a positive change.<br />
        <br />
        <strong>Exchange Items.</strong> One person's trash is another person's treasure! Easily exchange or donate items you no longer need. From clothing swaps to book exchanges, it's a win-win for you and the environment.<br />
        <br />
        <strong>Organize Sustainable Events.</strong> Planning a neighborhood cleanup, tree planting, or a workshop on sustainable gardening? EcoUpper makes it simple to create and promote events that bring your community together.<br />
        <br />
        <strong>Share Your Sustainable Journey.</strong> Inspire and be inspired! Share your sustainable lifestyle, tips, and experiences with your friends. Whether you're reducing your carbon footprint or adopting zero-waste practices, your journey can inspire others to take action.<br />
      </div>

      <div className="joinAbout">
        <p>
          <h3><strong>Let's Make a Difference</strong></h3>
          EcoUpper is more than just an app - it's a movement. Join us in creating a global network of eco-conscious individuals and communities who are dedicated to making sustainability a way of life.<br />
          <br />
          Together, we can turn the tide and make the world a better place for generations to come. Join us on EcoUpper and let's create a greener, more sustainable future, one step at a time. Together, we can make a world of difference.
        </p>
      </div>

      <div className="teamAbout">
        <h1> <strong>EcoUppers</strong></h1>
        <div className="membersContainer">
          <div className="teamMember">
            <img src={EdnaImg} alt="Edna" />
            <h3>Edna Vidal</h3>
            <p><strong>CEO</strong></p>
          </div>
          <div className="teamMember">
            <img src={ErikImg} alt="" />
            <h3>Erik Arvid</h3>
            <p><strong>CTO</strong></p>
          </div>
          <div className="teamMember">
            <img src={JDImg} alt="" />
            <h3>Juan David Valencia</h3>
            <p><strong>Design</strong></p>
          </div>
          <div className="teamMember">
            <img src={OscarImg} alt="" />
            <h3>Óscar Mesejo</h3>
            <p><strong>Design</strong></p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;
