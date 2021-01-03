package com.localizeus.core.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.localizeus.core.web.rest.TestUtil;

public class UserProjectPermissionDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserProjectPermissionDTO.class);
        UserProjectPermissionDTO userProjectPermissionDTO1 = new UserProjectPermissionDTO();
        userProjectPermissionDTO1.setId(1L);
        UserProjectPermissionDTO userProjectPermissionDTO2 = new UserProjectPermissionDTO();
        assertThat(userProjectPermissionDTO1).isNotEqualTo(userProjectPermissionDTO2);
        userProjectPermissionDTO2.setId(userProjectPermissionDTO1.getId());
        assertThat(userProjectPermissionDTO1).isEqualTo(userProjectPermissionDTO2);
        userProjectPermissionDTO2.setId(2L);
        assertThat(userProjectPermissionDTO1).isNotEqualTo(userProjectPermissionDTO2);
        userProjectPermissionDTO1.setId(null);
        assertThat(userProjectPermissionDTO1).isNotEqualTo(userProjectPermissionDTO2);
    }
}
