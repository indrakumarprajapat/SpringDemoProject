package com.example.demo.exceptionHandler;

import org.springframework.stereotype.Component;

@Component
public class EmptyFieldHandler extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer errorCode;
	private String message;

	public Integer getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(Integer errorCode) {
		this.errorCode = errorCode;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public EmptyFieldHandler(Integer errorCode, String message) {
		super();
		this.errorCode = errorCode;
		this.message = message;
	}

	public EmptyFieldHandler() {
		super();
		// TODO Auto-generated constructor stub
	}

	public EmptyFieldHandler(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
		// TODO Auto-generated constructor stub
	}

	public EmptyFieldHandler(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

	public EmptyFieldHandler(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	public EmptyFieldHandler(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}

}
