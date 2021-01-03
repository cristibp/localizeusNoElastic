package com.localizeus.core.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.localizeus.core.web.rest.TestUtil;

public class ProjectHistoryDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProjectHistoryDTO.class);
        ProjectHistoryDTO projectHistoryDTO1 = new ProjectHistoryDTO();
        projectHistoryDTO1.setId(1L);
        ProjectHistoryDTO projectHistoryDTO2 = new ProjectHistoryDTO();
        assertThat(projectHistoryDTO1).isNotEqualTo(projectHistoryDTO2);
        projectHistoryDTO2.setId(projectHistoryDTO1.getId());
        assertThat(projectHistoryDTO1).isEqualTo(projectHistoryDTO2);
        projectHistoryDTO2.setId(2L);
        assertThat(projectHistoryDTO1).isNotEqualTo(projectHistoryDTO2);
        projectHistoryDTO1.setId(null);
        assertThat(projectHistoryDTO1).isNotEqualTo(projectHistoryDTO2);
    }
}
