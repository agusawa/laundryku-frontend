import { FormikHelpers, FormikProps } from 'formik';
import { sanitizeValidationError } from '../../../utils/errorHandler';
import { useCallback, useEffect, useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Copyright from './Copyright';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LoginForm, { LoginFormValues, LoginValidationError } from './LoginForm';
import Typography from '@material-ui/core/Typography';
import useLoginHook from './useLoginHook';
import useLoginStyles from './useLoginStyles';

function LoginPage(): JSX.Element {
  const classes = useLoginStyles();
  const { loginMutation, loginOptions } = useLoginHook();

  const formRef = useRef<FormikProps<LoginFormValues>>(null);

  const onSubmit = useCallback(
    async (
      values: LoginFormValues,
      actions: FormikHelpers<LoginFormValues>,
    ) => {
      try {
        await loginMutation({
          variables: {
            identifier: values.identifier,
            password: values.password,
          },
        });
      } catch (err) {
        /** */
        console.log(err);
      }

      actions.setSubmitting(false);
    },
    [loginMutation],
  );

  useEffect(() => {
    if (!formRef.current) return;
    const err = loginOptions.error?.graphQLErrors[0];

    if (err) {
      const errors = sanitizeValidationError<LoginValidationError>(err);
      formRef.current.setErrors(errors);
    }
  }, [loginOptions.error]);

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h5">Sign in</Typography>
      <LoginForm formRef={formRef} onSubmit={onSubmit} />
      <Box mt={8}>
        <Copyright />
      </Box>
    </div>
  );
}

export default LoginPage;
