package org.tyaa.demo.springboot.simplespa.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.context.annotation.Configuration;
import org.tyaa.demo.springboot.simplespa.model.ResponseModel;
import org.tyaa.demo.springboot.simplespa.util.ErrorsGetter;

@Configuration
@Aspect
public class ExceptionsProcessor {

    // @Around("call(* org.tyaa.demo.springboot.simplespa.dao.*.*(..))")
    @Around("execution(* org.tyaa.demo.springboot.simplespa.dao.*.*(..))")
    public Object onDaoException(ProceedingJoinPoint pjp) throws Exception {
        Object output = null;
        try {
            output = pjp.proceed();
        } catch (Exception ex) {
            if (ErrorsGetter.getException(ex).contains("ConstraintViolationException")){
                throw new ConstraintViolationException("", null, "");
            }
            throw ex;
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
        return output;
    }

    // @Around("call(* org.tyaa.demo.springboot.simplespa.service.*.*(..))")
    @Around("execution(* org.tyaa.demo.springboot.simplespa.service.*.*(..))")
    public Object onServiceException(ProceedingJoinPoint pjp) {
        Object output = null;
        try {
            output = pjp.proceed();
        } catch (ConstraintViolationException ex) {
            output =
                ResponseModel.builder()
                    .status(ResponseModel.FAIL_STATUS)
                    .message("This name is already taken")
                    .build();
        } catch (Exception ex) {
            System.err.println("SQL Error!");
            ex.printStackTrace();
            output =
                ResponseModel.builder()
                    .status(ResponseModel.FAIL_STATUS)
                    .message("Unknown database error")
                    .build();
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
        return output;
    }
}
