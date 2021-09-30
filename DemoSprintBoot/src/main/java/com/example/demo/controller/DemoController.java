package com.example.demo.controller;

import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Question;
import com.example.demo.service.DemoService;

@RestController
@RequestMapping("/v1/api/quesitons")
 public class DemoController {
	
	@Autowired
	private DemoService demoService;

	@PostMapping
	public ResponseEntity<Question> questionSave(@RequestBody Question question){
		Question createQuestion = demoService.createQuestion(question);
		return new ResponseEntity<Question>(createQuestion,HttpStatus.CREATED);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Question> getQuestion(@PathVariable(name = "id")Long id){
		Question question = demoService.getQuestion(id);
		return new ResponseEntity<Question>(question,HttpStatus.OK);
 	}
	
	@GetMapping
	public ResponseEntity<List<Question>> getAllQuestion(){
		List<Question> questions = demoService.getQuestions();
		return new ResponseEntity<List<Question>>(questions,HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Question> updateQuestion(@RequestBody Question question){
		Question queUpdated = demoService.updateQuestion(question);
		return new ResponseEntity<Question>(queUpdated,HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteQuestion(@PathVariable(name = "id")Long id){
		String result = demoService.deleteQuestion(id);
		return new ResponseEntity<String>(result,HttpStatus.ACCEPTED);
	}
	
}
