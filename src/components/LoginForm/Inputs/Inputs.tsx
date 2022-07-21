import React, { useContext, useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Form, InputGroup, OverlayTrigger } from 'react-bootstrap';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import PasswordStrengthBar from 'react-password-strength-bar';
import RenderToolTip from '../../RenderToolTip/RenderToolTip';
import Icon from '../../Icon/Icon';
import styles from './Inputs.module.css';
import Context from '../../../context/Context';

interface IProps {
  isReg: boolean;
}
function Inputs({ isReg }: IProps): JSX.Element {
  const { store } = useContext(Context);
  const [isShowPass, setIsShowPass] = useState(false);
  const [email, setEmail] = useState<string>(store.defaultData.email);
  const [password, setPassword] = useState<string>(store.defaultData.password);
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
              }}
              value={password}
            />
          </InputGroup>
        </OverlayTrigger>
        {isReg ? <PasswordStrengthBar password={password} /> : null}
        <div className={cn(styles.secondPass, { [styles.hidden]: !isReg })}>
          <InputGroup>
            <Form.Control type={isShowPass ? 'text' : 'password'} placeholder="Repaet password" />
          </InputGroup>
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
