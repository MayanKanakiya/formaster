
package com.formaster;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@SpringBootApplication
@EnableScheduling
public class FormasterDemoApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(FormasterDemoApplication.class, args);
//		FormasterDemoApplication obj = new FormasterDemoApplication();
		/* obj.SchedulingDemo(); */
	}

//	FixedRates
//	FixedDelay
//	cron(second minute hour day-of-month month day-of-week year (optional))
	/*
	 * @Scheduled(cron = "1 12 3 * * ?") public void SchedulingDemo() { Date
	 * currentDate = new Date(); SimpleDateFormat dateFormat = new
	 * SimpleDateFormat("hh:mm:ss"); String formattedDate =
	 * dateFormat.format(currentDate); System.out.println(formattedDate); }
	 */
}

@Repository
class SchedulerService {
	@Scheduled(cron = "0 26 15 * * ?")
	public void SchedulingDemo() {
		Date currentDate = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("hh:mm:ss");
		String formattedDate = dateFormat.format(currentDate);
		System.out.println(formattedDate);
	}
}
