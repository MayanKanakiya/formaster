package com.formaster.mstform;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.formaster.user.UserDTO;

import jakarta.servlet.http.HttpSession;

@Service
public class MasterFormServiceImp implements MasterFormService {

	@Autowired
	MasterFormRepository formRepository;

	@Autowired
	PasswordGenerate passGenerate;

	@Autowired
	private EmailService emailService;

	@Autowired
	private HttpSession session;

	public static String capitalizeFirst(String input) {
		if (input == null || input.isEmpty()) {
			return input;
		}
		return input.substring(0, 1).toUpperCase() + input.substring(1);
	}

	@Override
	public UserDTO AddUserJValid(UserDTO dto) {
		try {
			// Validate First Name
			if (dto.getFname() == null || dto.getFname().trim().isEmpty()) {
				dto.addMessage("400", "Please enter first name");
				return dto;
			}
			if (!dto.getFname().matches("^[a-zA-Z\\s]+$")) {
				dto.addMessage("400", "First name should only contain letters and spaces.");
				return dto;
			}
			if (!dto.getFname().matches("^(?! )[A-Za-z]+( [A-Za-z]+)*$")) {
				dto.addMessage("400", "Enter first name without any extra spaces.");
				return dto;
			}
			if (dto.getFname().trim().length() <= 1) {
				dto.addMessage("400", "First name must be more than 1 character.");
				return dto;
			}
			if (dto.getFname().trim().length() > 6) {
				dto.addMessage("400", "First name must not exceed 6 characters.");
				return dto;
			}
			// Validate Last Name
			if (dto.getLname() == null || dto.getLname().trim().isEmpty()) {
				dto.addMessage("400", "Please enter last name");
				return dto;
			}
			if (!dto.getLname().matches("^[a-zA-Z\\s]+$")) {
				dto.addMessage("400", "Last name should only contain letters and spaces.");
				return dto;
			}
			if (!dto.getLname().matches("^(?! )[A-Za-z]+( [A-Za-z]+)*$")) {
				dto.addMessage("400", "Enter last name without any extra spaces.");
				return dto;
			}
			if (dto.getLname().trim().length() <= 2) {
				dto.addMessage("400", "Last name must be more than 2 characters.");
				return dto;
			}
			if (dto.getLname().trim().length() > 10) {
				dto.addMessage("400", "Last name must not exceed 10 characters.");
				return dto;
			}
			// Validate Email
			if (dto.getEmail() == null || dto.getEmail().trim().isEmpty()) {
				dto.addMessage("400", "Please enter email");
				return dto;
			}
			if (!dto.getEmail().matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")) {
				dto.addMessage("400", "Please enter a valid email.");
				return dto;
			}

			// Validate Contact Number
			if (dto.getCno() != null && !dto.getCno().trim().isEmpty()) {
				if (dto.getCno().trim().length() != 10) {
					dto.addMessage("400", "Contact number should be exactly 10 digits.");
					return dto;
				}
				if (!dto.getCno().matches("^\\d+$")) {
					dto.addMessage("400", "Contact number should contain only digits.");
					return dto;
				}
			}

			// Validate Gender
			if (dto.getGender().equals("0")) {
				dto.addMessage("400", "Please select gender");
				return dto;
			}
			if (dto.getValidfrom() != null && !dto.getValidfrom().trim().isEmpty()) {
				if (dto.getValidto() == null || dto.getValidto().trim().isEmpty()) {
					dto.addMessage("400", "Please enter 'Valid To' date");
					return dto;
				}
			}
			// Validate Valid From Date
			if (dto.getValidfrom() != null && !dto.getValidfrom().trim().isEmpty()) {
				if (!dto.getValidfrom().matches("^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/(\\d{4})$")) {
					dto.addMessage("400", "Invalid date format for 'Valid From'. Please use DD/MM/YYYY.");
					return dto;
				}

				SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
				sdf.setLenient(false);
				Date fromDate = sdf.parse(dto.getValidfrom());
				Date today = new Date();
				today = sdf.parse(sdf.format(today));

				if (!fromDate.equals(today)) {
					dto.addMessage("400", "You must select today's date for 'Valid From'.");
					return dto;
				}
			}
			if (dto.getValidto() != null && !dto.getValidto().trim().isEmpty()) {
				if (dto.getValidfrom() == null || dto.getValidfrom().trim().isEmpty()) {
					dto.addMessage("400", "Please enter 'Valid From' date");
					return dto;
				}
			}
			// Validate Valid To Date
			if (dto.getValidto() != null && !dto.getValidto().trim().isEmpty()) {
				if (!dto.getValidto().matches("^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/(\\d{4})$")) {
					dto.addMessage("400", "Invalid date format for 'Valid To'. Please use DD/MM/YYYY.");
					return dto;
				}

				SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
				sdf.setLenient(false);
				Date fromDate = sdf.parse(dto.getValidfrom());
				Date toDate = sdf.parse(dto.getValidto());

				if (toDate.before(fromDate)) {
					dto.addMessage("400", "'Valid To' date must be a future date after 'Valid From'.");
					return dto;
				}
			}

			// Validate Role
			if (dto.getUrole() == 0) {
				dto.addMessage("400", "Please select user role");
				return dto;
			}
			// Validate Image File Type
			if (dto.getImage() != null && !dto.getImage().trim().isEmpty()) {
				String fileName = dto.getImage();
				int idxDot = fileName.lastIndexOf(".") + 1;

				if (idxDot > 0) {
					String extFile = fileName.substring(idxDot).toLowerCase();

					if (!extFile.equals("jpg") && !extFile.equals("jpeg") && !extFile.equals("png")) {
						dto.addMessage("400", "Only JPG, JPEG, and PNG files are allowed for user image.");
						return dto;
					}
				} else {
					dto.addMessage("400", "Invalid file format.");
					return dto;
				}
			}

			// If all validations pass
			dto.addMessage("200", "Success add user server side validation.");
			return dto;

		} catch (Exception e) {
			System.out.println(e.getMessage());
			dto.addMessage("500", "Internal server error: Validation failed.");
			return dto;
		}

	}

	@Override
	public UserDTO AddUser(UserDTO dto, MultipartFile imageFile) {
		// try-catch for checking duplication email
		try {
			if (formRepository.duplicateEmail(dto.getEmail().trim().toLowerCase()) > 0) {
				dto.addMessage("400", "Email are already exists, try new email.");
				return dto;
			} else {
				// try-catch for add user
				try {
					String pass = passGenerate.generateRandomPassword(12);
					String hashedPassword = passGenerate.hashPassword(pass);
					int createdby = (int) session.getAttribute("currentLogin");

					String imageFileName = null;

					if (imageFile != null && !imageFile.isEmpty()) {
						try {
							String uploadDir = "F:" + File.separator + "Emerging Five" + File.separator
									+ "formasterUserImg";
							String fileExtension = imageFile.getOriginalFilename()
									.substring(imageFile.getOriginalFilename().lastIndexOf("."));

							String fileName = "demo_" + createdby + fileExtension;

							File uploadFile = new File(uploadDir, fileName);
							imageFile.transferTo(uploadFile);

							imageFileName = File.separator + "images" + File.separator + fileName;
						} catch (IOException e) {
							dto.addMessage("500", "Error saving image file.");
							return dto;
						}
					}

					if (hashedPassword == null) {
						dto.addMessage("500", "Error hashing password.");
						return dto;
					}
					dto.setPass(hashedPassword);
					int addUser = formRepository.mstUserAdd(dto.getActive(), dto.getCno(), createdby,
							dto.getEmail().trim().toLowerCase(), capitalizeFirst(dto.getFname().trim().toLowerCase()),
							dto.getGender(), imageFileName, capitalizeFirst(dto.getLname().trim().toLowerCase()),
							dto.getPass(), dto.getUrole(), dto.getValidfrom(), dto.getValidto());

					if (addUser > 0) {
						emailService.sendEmail(dto.getEmail().trim().toLowerCase(), "ForMaster : your password",
								"Your password is :" + pass);
						dto.addMessage("200",
								"Your profile is added in our database, check your email for your password");
						return dto;
					} else {
						dto.addMessage("400", "Your profile not added, try again");
						return dto;
					}
				} catch (Exception e) {
					System.out.println(e.getMessage());
					dto.addMessage("500", "Internal server error while adding your profile");
					return dto;
				}
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			dto.addMessage("500", "Internal server error while checking duplication email");
			return dto;
		}
	}
}
