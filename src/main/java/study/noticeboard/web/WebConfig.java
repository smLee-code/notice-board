package study.noticeboard.web;

import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // 모든 경로에 대해 CORS 허용
                        .allowedOrigins("http://localhost:3000") // 허용할 출처
                        .allowedMethods("GET", "POST", "PUT", "DELETE"); // 허용할 HTTP 메서드
            }
        };
    }
}
