package com.example.demo.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.exceptionHandler.EmptyFieldHandler;
import com.example.demo.model.Question;
import com.example.demo.service.DemoService;

import javassist.NotFoundException;

@Service
public class DemoServiceImpl implements DemoService {

	@Autowired
	private DemoRepository demoRepository;

	@Override
	public Question createQuestion(Question question) {
		   //validation  handler
		    if(question.getText().isEmpty())
		       throw new EmptyFieldHandler(601,"Question text can't be empty");
		    if(question.getAnswer().isEmpty())
		    	throw new EmptyFieldHandler(602,"Question answer can't be empty");
		    
		    Question qusObject = demoRepository.save(question);		
		    
		    return qusObject;           
 	}

	@Override
	public Question getQuestion(Long id) {
		Optional<Question> quesiton = demoRepository.findById(id);
		if (quesiton.isPresent()) {
			return quesiton.get();
		} else
			return null;
	}

	@Override
	public Question updateQuestion(Question question) {
		Question qusObject = demoRepository.save(question);

		return qusObject;
	}

	@Override
	public String deleteQuestion(long id) {
		demoRepository.deleteById(id);
		;
		return "Question has deleted";
	}

	@Override
	public List<Question> getQuestions() {
		List<Question> questions = demoRepository.findAll();
		return questions;
	}
}
