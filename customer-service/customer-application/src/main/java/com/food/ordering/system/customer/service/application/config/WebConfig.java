package com.food.ordering.system.customer.service.application.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(
                            "http://localhost:3000",
                            "http://localhost:8080",
                            "http://a7d2e264d0561449581223106ac20650-43070287.us-east-1.elb.amazonaws.com"
                        )
                        .allowedMethods("*");
            }
        };
    }
} 