package jbugs.eclass;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EclassApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();

		System.setProperty("MYSQL_HOST_PORT", dotenv.get("MYSQL_HOST_PORT"));
		System.setProperty("USER_NAME", dotenv.get("USER_NAME"));
		System.setProperty("USER_PASSWORD", dotenv.get("USER_PASSWORD"));
		System.setProperty("file_dir", dotenv.get("file_dir"));

		SpringApplication.run(EclassApplication.class, args);
	}

}
