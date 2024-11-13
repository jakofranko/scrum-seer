import { useState } from 'preact/hooks';
import EpicForm from './components/EpicForm.jsx';
import FeatureForm from './components/FeatureForm.jsx';
import StoryForm from './components/StoryForm.jsx';
import UserForm from './components/UserForm.jsx';
import './app.css';

export function App() {
  return (
    <>
      <div>
        <EpicForm />
        <FeatureForm />
        <StoryForm />
        <UserForm />
      </div>
    </>
  )
}
