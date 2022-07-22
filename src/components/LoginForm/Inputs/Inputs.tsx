/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import React, { useContext, useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Form, InputGroup, OverlayTrigger } from 'react-bootstrap';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import PasswordStrengthBar from 'react-password-strength-bar';
import { FaTimes } from 'react-icons/fa';
import { MdDone } from 'react-icons/md';
import RenderToolTip from '../../RenderToolTip/RenderToolTip';
import Icon from '../../Icon/Icon';
import styles from './Inputs.module.css';
import Context from '../../../context/Context';
import IconWrap from '../../IconWrap/IconWrap';

interface IProps {
  isReg: boolean;
}
function Inputs({ isReg }: IProps): JSX.Element {
  const { store } = useContext(Context);
  const [isShowPass, setIsShowPass] = useState(false);
  const [email, setEmail] = useState<string>(store.defaultData.email);
  const [password, setPassword] = useState<string>(store.defaultData.password);
  const [comparePass, setComparePass] = useState(false);
  const [visibleIconCopare, setVisibleIconCompare] = useState(false);
  function findClass(): string {
    if (comparePass) return 'iconDone';
    return 'iconError';
  }
  console.log(findClass());
  return (
    <div className={styles.inputsGroup}>
      <InputGroup>
        <Form.Control
          placeholder="Email"
          onChange={(e): void => {
            setEmail(e.target.value);
            store.setDefaultData({ email: e.target.value, password });
          }}
          value={email}
        />
      </InputGroup>
      <div className={styles.wrapPass}>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={RenderToolTip(
            'Your password should have at least one number, one uppercase letter, one lowercase letter, and one special symbol.'
          )}
        >
          <InputGroup>
            <Form.Control
              type={isShowPass ? 'text' : 'password'}
              placeholder="Password"
              onChange={(e): void => {
                setPassword(e.target.value);
                store.setDefaultData({ email, password: e.target.value });
                setComparePass(false);
              }}
              value={password}
            />
          </InputGroup>
        </OverlayTrigger>
        {isReg ? <PasswordStrengthBar password={password} /> : null}
        <div className={cn(styles.secondPass, { [styles.hidden]: !isReg })}>
          <InputGroup>
            <Form.Control
              onChange={(e): void => {
                if (`${e.target.value}` !== '') {
                  setVisibleIconCompare(true);
                } else {
                  setVisibleIconCompare(false);
                }
                if (password === `${e.target.value}`) {
                  setComparePass(true);
                } else {
                  setComparePass(false);
                }
              }}
              type={isShowPass ? 'text' : 'password'}
              placeholder="Repaet password"
            />
          </InputGroup>
          {visibleIconCopare ? (
            <IconWrap
              iconChild={comparePass ? <MdDone /> : <FaTimes />}
              iconStyles={{
                className: findClass(),
                size: '20',
              }}
              className="checkPass"
            />
          ) : null}
        </div>
        <div className={styles.showPass} onClick={(): void => setIsShowPass(!isShowPass)}>
          <Icon
            iconChild={isShowPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            styles={{ className: 'navIcon outIcon', size: '20', title: 'Show password' }}
            isToolTip={false}
            toolTipText=""
          />
        </div>
      </div>
    </div>
  );
}

export default observer(Inputs);
