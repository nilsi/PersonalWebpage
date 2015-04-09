package sample.ui.controller;

import org.springframework.web.bind.annotation.*;
import sample.ui.service.MailService;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

@RestController
public class ContactController {

    @Inject
    private MailService mailService;

    @RequestMapping(value = "/contact", method = RequestMethod.POST)
    public boolean contact(@RequestParam(value = "name") String name, @RequestParam(value = "email") String email, @RequestParam(value = "number") String number, @RequestParam(value = "message") String message, HttpServletRequest request) {
        mailService.sendEmail("hard-coded-to@email.com", email, "Subject" + name, number, message, false, false);
        return true;
    }
}
