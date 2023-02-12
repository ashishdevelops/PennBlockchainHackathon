
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';
import Button from '@mui/material/Button'

const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];


const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
];

const posts = [post1, post2, post3];

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

const theme = createTheme();

export default function Blog({ setPage, page }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="The New York Times" sections={sections} page={page} />
        <Button
          onClick={() => {setPage('home')}}
          variant='contained'
        >
          Return to Home
        </Button>
          <main>
            <h1>SPIDER-MAN: HERO OR THREAT? A THOROUGH INVESTIGATION</h1>
<h2>By J. Jonah Jameson, Editor-in-Chief of the Daily Bugle</h2>
<p>For years, the citizens of New York City have been both captivated and frightened by the masked vigilante known as Spider-Man. With his superhuman abilities and quick reflexes, he has certainly been effective in stopping crime on the streets. But the question remains: is he truly a hero, or just another dangerous menace to society?</p>
<p>Let's examine the facts. In his early days, Spider-Man was nothing more than a reckless teenager with a costume, interfering with police work and causing more problems than he solved. He has been involved in numerous destructive battles, putting innocent lives at risk and causing millions of dollars in property damage. It's one thing to stop a criminal, but it's another thing entirely to destroy half a city block in the process. Is this the type of hero we want in our city?</p>
<p>And what about his secret identity? How can we trust a man who hides behind a mask and refuses to reveal his true motives? His actions are those of a vigilante, taking the law into his own hands without any accountability. It's clear that he has no regard for due process or the rule of law. He operates outside the confines of our justice system, and there is no way to hold him accountable for his actions. What if he were to make a mistake, or worse, use his powers for evil purposes? The thought is chilling.</p>
<p>Some may argue that Spider-Man has saved countless lives, and that his actions are for the greater good. They point to the numerous times he has stopped criminals and saved innocent people from harm. But at what cost? When does the end justify the means? Is it acceptable for a masked vigilante to use his powers to deliver street justice, no matter the consequences?</p>
<p>And let's not forget the psychological impact that Spider-Man has had on the city. People are living in fear, constantly looking over their shoulder, worried that the next time they hear the sound of web-slinging, it might be the end for them. This type of constant stress and anxiety takes a toll on the citizens of this city, and it's time for it to stop.</p>
<p>It is time for the citizens of New York City to ask themselves: do we really want a masked man with god-like powers prowling the streets, operating outside the law? Is Spider-Man truly a hero, or just another dangerous threat that must be stopped?</p>
<p>The Daily Bugle has been at the forefront of reporting on this controversial figure, bringing you the truth about Spider-Man, no matter the cost. Our team of experienced journalists will leave no stone unturned as we uncover the facts about this so-called hero, and expose the truth to the public. We have received numerous tips from sources who claim to have information about his true identity, and we will stop at nothing to uncover the truth and bring it to the public.</p>
<p>And let's not forget the property damage that he has caused. The destruction that he leaves in his wake is a burden on taxpayers, who are left to pick up the pieces and pay for the repairs. It's not just the physical damage either, but the psychological toll that it takes on the citizens of this city who are constantly living in fear of the next attack from Spider-Man.</p>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}
