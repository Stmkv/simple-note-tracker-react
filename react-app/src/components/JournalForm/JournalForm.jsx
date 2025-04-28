import styles from './JournalForm.module.scss';
import Button from '../Button/Button';
import { useEffect, useReducer, useRef } from 'react';
import cn from 'classname';
import { INITIAL_STATE, formReducer } from './JournalForm.state';

function JournalForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const postRef = useRef();

  const focusError = isValid => {
    switch(true) {
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
        <input
          type='text'
          name='title'
          ref={titleRef}
          onChange={onChange}
          value={values.title}
          className={cn(styles['input-title'], {
            [styles['invalid']]: !isValid.title,
          })}
        />
      </div>
      <div className={styles['form-row']}>
        <label for='date' className={styles['form-label']}>
          <img src='/calendar.svg' alt='Иконка календаря' />
          <span>Дата</span>
        </label>
        <input
          type='date'
          name='date'
          id='date'
          ref={dateRef}
          value={values.date}
          onChange={onChange}
          className={cn(styles['input'], {
            [styles['invalid']]: !isValid.date,
          })}
        />
      </div>
      <div className={styles['form-row']}>
        <label for='tag' className={styles['form-label']}>
          <img src='/tag.svg' alt='Иконка папки' />
          <span>Тег</span>
        </label>
        <input
          type='text'
          name='tag'
          id='tag'
          value={values.tag}
          onChange={onChange}
          className={styles['input']}
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
