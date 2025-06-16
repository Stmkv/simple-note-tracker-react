import styles from './JournalForm.module.scss';
import Button from '../Button/Button';
import { useContext, useEffect, useReducer, useRef } from 'react';
import cn from 'classname';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';

function JournalForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const postRef = useRef();

  const { userId } = useContext(UserContext);

  const focusError = isValid => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.post:
        postRef.current.focus();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.post || !isValid.title) {
      focusError(isValid);
      timerId = setTimeout(() => {
        dispatchForm({ type: 'RESET_VALIDITY' });
      }, 2000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: 'CLEAR' });
    }
  }, [isFormReadyToSubmit, values, onSubmit]);

  useEffect(() => {
    dispatchForm({
      type: 'SET_VALUE',
      payload: { userId },
    });
  }, [userId]);

  const onChange = e => {
    dispatchForm({
      type: 'SET_VALUE',
      payload: { [e.target.name]: e.target.value },
    });
  };

  const addJournalItem = e => {
    e.preventDefault();
    dispatchForm({ type: 'SUBMIT' });
  };

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div>
        <Input
          type='text'
          ref={titleRef}
          onChange={onChange}
          value={values.title}
          name='title'
          isValid={!isValid.title}
          appearence='title'
        />
      </div>
      <div className={styles['form-row']}>
        <label for='date' className={styles['form-label']}>
          <img src='/calendar.svg' alt='Иконка календаря' />
          <span>Дата</span>
        </label>
        <Input
          type='date'
          name='date'
          id='date'
          ref={dateRef}
          value={values.date}
          onChange={onChange}
          isValid={!isValid.date}
        />
      </div>
      <div className={styles['form-row']}>
        <label for='tag' className={styles['form-label']}>
          <img src='/tag.svg' alt='Иконка папки' />
          <span>Тег</span>
        </label>
        <Input
          type='text'
          name='tag'
          id='tag'
          value={values.tag}
          onChange={onChange}
        />
      </div>

      <textarea
        name='post'
        id=''
        cols='30'
        rows='10'
        ref={postRef}
        value={values.post}
        onChange={onChange}
        className={cn(styles['input'], {
          [styles['invalid']]: !isValid.post,
        })}
      ></textarea>
      <Button text='Сохранить' />
    </form>
  );
}

export default JournalForm;
