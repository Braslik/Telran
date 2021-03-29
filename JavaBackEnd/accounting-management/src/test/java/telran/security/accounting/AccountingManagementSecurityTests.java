package telran.security.accounting;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.reactive.server.WebTestClient;

import telran.security.accounting.dto.AccountPassword;
import telran.security.accounting.dto.AccountRequest;
import telran.security.accounting.dto.AccountRole;

import static telran.security.accounting.api.ApiConstants.*;

import java.util.Base64;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;


@SpringBootTest
@AutoConfigureWebTestClient
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestPropertySource(locations = {"classpath:application-security.properties"})

public class AccountingManagementSecurityTests {
	private static final @NotEmpty String USER = "user";
	private static final @Size(min = 8) String PASSWORD = "password";
	private static final @Size(min = 8) String NEW_PASSWORD = "new_password";
	private static final String AUTHORIZATION_HEADER = "Authorization";
	@Autowired
WebTestClient testClient;
	@Value("${app-username-admin}")
	String adminUsername;
	@Value("${app-password-admin}")
	String adminPassword;
	AccountRequest account = new AccountRequest(USER, PASSWORD, new String[0] ,
			1);
	AccountPassword accountPassword = new AccountPassword(USER, NEW_PASSWORD);
	AccountRole accountRole = new AccountRole(USER, "role");
	
/************************************************************/
	/* Authorization normal*/
	@Test
	@Order(1)
	@WithMockUser(roles = {"ADMIN"})
	void addAccountAuthorizationNormal() {
		testClient.post().uri(ADD_ACCOUNT)
		.bodyValue(account).exchange().expectStatus().isOk();
	}
	@Test
	@Order(2)
	@WithMockUser(roles = {"USER"})
	void getAccountAuthorizationUserNormal() {
		testClient.get().uri(GET_ACCOUNT + "?username=user")
		.exchange().expectStatus().isOk();
	}
	@Test
	@Order(3)
	@WithMockUser(roles = {"ADMIN"})
	void getAccountAuthorizationAdminNormal() {
		testClient.get().uri(GET_ACCOUNT + "?username=user")
		.exchange().expectStatus().isOk();
	}
	@Test
	@Order(4)
	@WithMockUser(roles = {"ADMIN"})
	void updatePasswordAuthorizationNormal() {
		testClient.put().uri(UPDATE_PASSWORD).bodyValue(accountPassword)
		.exchange().expectStatus().isOk();
	}
	@Test
	@Order(5)
	@WithMockUser(roles = {"ADMIN"})
	void addRoleAuthorizationNormal() {
		testClient.put().uri(ADD_ROLE).bodyValue(accountRole)
		.exchange().expectStatus().isOk();
	}
	@Test
	@Order(6)
	@WithMockUser(roles = {"ADMIN"})
	void removeRoleAuthorizationNormal() {
		testClient.put().uri(REMOVE_ROLE).bodyValue(accountRole)
		.exchange().expectStatus().isOk();
	}
	@Test
	@Order(7)
	@WithMockUser(roles = {"ADMIN"})
	void deleteAccountAuthorizationNormal() {
		testClient.delete().uri(REMOVE_ACCOUNT + "?username=user")
		.exchange().expectStatus().isOk();
	}
	/* Authorization error*/
	@Test
	@Order(8)
	@WithMockUser(roles = {"USER"})
	void addAccountAuthorizationError() {
		testClient.post().uri(ADD_ACCOUNT)
		.bodyValue(account).exchange().expectStatus().isEqualTo(403);
	}
	@Test
	@Order(9)
	@WithMockUser(roles = {"ABC"})
	void getAccountAuthorizationUserError() {
		testClient.get().uri(GET_ACCOUNT + "?username=user")
		.exchange().expectStatus().isEqualTo(403);
	}
	
	@Test
	@Order(10)
	@WithMockUser(roles = {"USER"})
	void updatePasswordAuthorizationError() {
		testClient.put().uri(UPDATE_PASSWORD).bodyValue(accountPassword)
		.exchange().expectStatus().isEqualTo(403);
	}
	@Test
	@Order(11)
	@WithMockUser(roles = {"USER"})
	void addRoleAuthorizationError() {
		testClient.put().uri(ADD_ROLE).bodyValue(accountRole)
		.exchange().expectStatus().isEqualTo(403);
	}
	@Test
	@Order(12)
	@WithMockUser(roles = {"USER"})
	void removeRoleAuthorizationError() {
		testClient.put().uri(REMOVE_ROLE).bodyValue(accountRole)
		.exchange().expectStatus().isEqualTo(403);
	}
	@Test
	@Order(13)
	@WithMockUser(roles = {"USER"})
	void deleteAccountAuthorizationError() {
		testClient.delete().uri(REMOVE_ACCOUNT + "?username=user")
		.exchange().expectStatus().isEqualTo(403);
	}
	/*********************************************************************/
	    /*Authentication*/
	/* Authentication tests unlike the authorization ones may be done only for one method */
	
	@Test
	@Order(14)
	void getAccountAuthNormal() {
		String authToken = "Basic " + Base64.getEncoder()
		.encodeToString((adminUsername + ":" + adminPassword).getBytes()); 
		testClient.get().uri(GET_ACCOUNT + "?username=user")
		.header(AUTHORIZATION_HEADER, authToken)
		.exchange().expectStatus().isOk();
	}
	
	@Test
	@Order(15)
	void getAccountAuthWrong() {
		String authTokenWrong = "Basic " + Base64.getEncoder()
		.encodeToString((adminUsername + ":" + "abcdefrrrr").getBytes());
		testClient.get().uri(GET_ACCOUNT + "?username=user")
		.header(AUTHORIZATION_HEADER, authTokenWrong)
		.exchange().expectStatus().isEqualTo(401);
	}
	
	
	
	
	
}